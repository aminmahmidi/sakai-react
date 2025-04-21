'use client';

import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';

export default function SignInPage() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const handleSendCode = async () => {
        if (!phoneNumber) {
            showError('لطفا شماره موبایل خود را وارد کنید');
            return;
        }

        if (phoneNumber.length < 11) {
            showError('شماره موبایل باید 11 رقم باشد');
            return;
        }

        setIsLoading(true);
        
        try {
            // در اینجا باید به API واقعی متصل شوید
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsCodeSent(true);
            showSuccess(`کد تایید به شماره ${phoneNumber} ارسال شد`);
        } catch (error) {
            showError('خطا در ارسال کد تایید');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!code) {
            showError('لطفا کد تایید را وارد کنید');
            return;
        }

        if (code.length !== 6) {
            showError('کد تایید باید 6 رقم باشد');
            return;
        }

        setIsLoading(true);
        
        try {
            // در اینجا باید به API واقعی متصل شوید
            await new Promise(resolve => setTimeout(resolve, 1000));
            showSuccess('ورود با موفقیت انجام شد!');
            router.push('/');
        } catch (error) {
            showError('کد تایید نامعتبر است');
        } finally {
            setIsLoading(false);
        }
    };

    const showError = (message: string) => {
        toast.current?.show({
            severity: 'error',
            summary: 'خطا',
            detail: message,
            life: 3000
        });
    };

    const showSuccess = (message: string) => {
        toast.current?.show({
            severity: 'success',
            summary: 'موفق',
            detail: message,
            life: 3000
        });
    };

    return (
        <div dir="rtl" className="flex justify-content-center align-items-center min-h-screen">
            <Toast ref={toast} />
            <Card title="ورود با شماره موبایل" className="w-full md:w-30rem">
                <div className="p-fluid">
                    {!isCodeSent ? (
                        <div>
                            <div className="p-field">
                                <label htmlFor="phone">شماره موبایل</label>
                                <InputText
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="09*********"
                                    keyfilter="num"
                                    maxLength={11}
                                />
                            </div>
                            <Button
                                label="ارسال کد تایید"
                                onClick={handleSendCode}
                                loading={isLoading}
                                className="w-full mt-3"
                            />
                        </div>
                    ) : (
                        <div>
                            <div className="p-field">
                                <label htmlFor="code">کد تایید</label>
                                <InputText
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="کد 6 رقمی"
                                    keyfilter="num"
                                    maxLength={6}
                                />
                                <small className="text-gray-500 block mt-1">کد به شماره {phoneNumber} ارسال شد</small>
                            </div>
                            <Button
                                label="تایید و ورود"
                                onClick={handleVerifyCode}
                                loading={isLoading}
                                className="w-full mt-3"
                            />
                            <Button
                                label="ارسال مجدد کد"
                                onClick={handleSendCode}
                                disabled={isLoading}
                                className="w-full mt-2 p-button-outlined"
                            />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}