export class Bank{
    public id: number;
    public bankName: string;
    public baseCur: string;
    public targetCur: string;
    public amount: number;
    public curRate: number;
    public convertedAmount: number;
}

export class CustomCurrency{
    public curName: string;
    public curValue: number;
}