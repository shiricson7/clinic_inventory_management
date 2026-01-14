"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase, supabaseConfigured } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Step = "request" | "verify";

export function PhoneLoginForm() {
  const [step, setStep] = useState<Step>("request");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) {
      return;
    }

    let isActive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isActive) {
        setSession(data.session);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const normalizedPhone = phone.trim();
  const normalizedOtp = otp.trim();

  const resetMessages = () => {
    setStatusMessage("");
    setErrorMessage("");
  };

  const requestOtp = async () => {
    if (!normalizedPhone) {
      setErrorMessage("휴대폰 번호를 입력해 주세요.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: normalizedPhone,
      options: { channel: "sms" }
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setStatusMessage("인증번호를 전송했어요.");
    setStep("verify");
  };

  const handleSendOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetMessages();

    if (!supabaseConfigured) {
      setErrorMessage("Supabase 환경 변수가 설정되지 않았어요.");
      return;
    }

    await requestOtp();
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetMessages();

    if (!supabaseConfigured) {
      setErrorMessage("Supabase 환경 변수가 설정되지 않았어요.");
      return;
    }

    if (!normalizedPhone) {
      setErrorMessage("휴대폰 번호를 입력해 주세요.");
      setStep("request");
      return;
    }

    if (!normalizedOtp) {
      setErrorMessage("인증번호를 입력해 주세요.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: normalizedPhone,
      token: normalizedOtp,
      type: "sms"
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setStatusMessage("로그인이 완료됐어요.");
    setOtp("");
  };

  const handleResend = async () => {
    resetMessages();

    if (!supabaseConfigured) {
      setErrorMessage("Supabase 환경 변수가 설정되지 않았어요.");
      return;
    }

    await requestOtp();
  };

  const handleSignOut = async () => {
    resetMessages();
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setStatusMessage("로그아웃했습니다.");
    setStep("request");
  };

  if (!supabaseConfigured) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Supabase 설정 필요</CardTitle>
          <CardDescription>
            `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 환경 변수에
            추가해 주세요.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (session) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>로그인 완료</CardTitle>
          <CardDescription>
            {session.user.phone ?? session.user.email ?? session.user.id}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-3">
          {statusMessage ? (
            <p className="text-xs text-accent">{statusMessage}</p>
          ) : null}
          {errorMessage ? <p className="text-xs text-danger">{errorMessage}</p> : null}
          <Button onClick={handleSignOut} disabled={loading}>
            로그아웃
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>휴대폰 로그인</CardTitle>
        <CardDescription>
          국제 표준 형식(E.164)으로 입력해 주세요. 예: +821012345678
        </CardDescription>
      </CardHeader>
      {step === "request" ? (
        <form onSubmit={handleSendOtp}>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">휴대폰 번호</label>
              <Input
                inputMode="tel"
                placeholder="+821012345678"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3">
            {statusMessage ? (
              <p className="text-xs text-accent">{statusMessage}</p>
            ) : null}
            {errorMessage ? <p className="text-xs text-danger">{errorMessage}</p> : null}
            <Button type="submit" disabled={loading || !normalizedPhone}>
              인증번호 전송
            </Button>
          </CardFooter>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">인증번호</label>
              <Input
                inputMode="numeric"
                placeholder="6자리 코드"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
            </div>
            <div className="text-xs text-muted">전송 대상: {normalizedPhone}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3">
            {statusMessage ? (
              <p className="text-xs text-accent">{statusMessage}</p>
            ) : null}
            {errorMessage ? <p className="text-xs text-danger">{errorMessage}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={loading || !normalizedOtp}>
                인증 완료
              </Button>
              <Button type="button" variant="outline" onClick={() => setStep("request")}>
                번호 수정
              </Button>
              <Button type="button" variant="ghost" onClick={handleResend} disabled={loading}>
                다시 전송
              </Button>
            </div>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
