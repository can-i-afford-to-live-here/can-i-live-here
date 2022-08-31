namespace src.Models;

public class City
{

    public long Id { get; set; }

    public string? Name { get; set; }
    
    public DateTime? UpdateDate { get; set; }

    public double MonthlySaleryNoTax  { get; set; }

    public double CostWithoutRent { get; set; }
}
