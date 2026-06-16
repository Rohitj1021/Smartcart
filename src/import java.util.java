import java.util.Scanner;

public class Main {
  public static void main(String[]args) {
	  Scanner sc=new Scanner(System.in);
	  System.out.println("Enter the number:");
	    int n=sc.nextInt();
	    int sum=0;
	    
	    for(int i=1;i<=n;i++) {
	    	System.out.println("Enter number " + i + ":");
            int number = sc.nextInt();
            sum += number;
	    }
	    
	    double average = (double) sum / n; 
	    

        System.out.println("The average of the entered numbers is: " + average);
  }
}
