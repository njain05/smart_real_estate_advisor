"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  };
  
  const monthlyPayment = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, interestRate, loanTerm]);

  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline">EMI Calculator</CardTitle>
        <CardDescription>Estimate your monthly mortgage payments.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="loan-amount">Loan Amount: {formatCurrency(loanAmount)}</Label>
          <Slider
            id="loan-amount"
            min={50000}
            max={1000000}
            step={10000}
            value={[loanAmount]}
            onValueChange={(value) => setLoanAmount(value[0])}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="interest-rate">Interest Rate: {interestRate.toFixed(2)}%</Label>
          <Slider
            id="interest-rate"
            min={1}
            max={15}
            step={0.01}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="loan-term">Loan Term: {loanTerm} years</Label>
          <Slider
            id="loan-term"
            min={5}
            max={40}
            step={1}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4 p-6 bg-muted/50 rounded-b-lg">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Monthly Payment</p>
          <p className="text-4xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
        </div>
        <div className="flex justify-between text-sm">
            <div className="text-center">
                <p className="text-muted-foreground">Total Payment</p>
                <p className="font-semibold">{formatCurrency(totalPayment)}</p>
            </div>
             <div className="text-center">
                <p className="text-muted-foreground">Total Interest</p>
                <p className="font-semibold">{formatCurrency(totalInterest)}</p>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
