import MortgageCalculator from "@/components/calculators/mortgage-calculator";

export default function MortgageCalculatorPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Mortgage & EMI Calculator
        </h1>
        <p className="text-muted-foreground mt-2">
          Estimate your monthly payments and loan affordability.
        </p>
      </header>
      <div className="flex justify-center">
        <MortgageCalculator />
      </div>
    </div>
  );
}
