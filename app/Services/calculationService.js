/*
 * Module: Retirement Calculations Service
 * Author: David Isovitsch
 */

angular.module("retirementRoad").service('calculationService', ["$interval", function($interval) {

    var self = this;

    var INITIAL_COST_OF_LIVING = 35;
    var INFLATION_PERCENTAGE = 3;
    var AVERAGE_RAISE_PERCENTAGE = 3;
    var RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE = 7;
    var PERCENTAGE_OF_FINAL_INCOME_NEEDED_IN_RETIREMENT = 35;
    var TARGET_RETIREMENT_AGE = 65;
    var TARGET_LIFE_EXPECTANCY = 85;
    var NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR = 12;
    var MONTHS_IN_YEAR = 12;
    var PERCENTAGE_OF_SALARY_FOR_DEBT_PAYOFF = 1;
    var DEBT_MINIMUM_PAYMENT_PERCENTAGE = 1;
    var MAX_GAME_TIME_IN_SECONDS = 300;
    var MAX_RETIREMENT_PERCENTAGE = 15;
    var TAX_RATE = 33;

    self.data = {
        initialSalary: 35000,
        salary: 0,
        initialDebt: 20000,
        debt: 0,
        initialAge: 18,
        age: 0,
        savings: 0,
        retirementBalance: 0,
        retirementPercentage: 0,
        debtPayment: 0,
        month: 0
    }

    self.startGame = function() {
        /* Kick-off time cycle */
        self.data.age = self.data.initialAge;
        self.data.salary = self.data.initialSalary;
        self.data.debt = self.data.initialDebt;
        var secondsPerMonth = MAX_GAME_TIME_IN_SECONDS / self.calculateNumberOfMonthsUntilRetirementAge(self.data.age * MONTHS_IN_YEAR);
        self.data.debtPayment = self.data.debt * (DEBT_MINIMUM_PAYMENT_PERCENTAGE / 100);

        $interval(function() {
            self.data.month++;
            if ((self.data.month % 12) == 0) {  /* Every year */
                self.data.salary = self.data.salary * (1 + (AVERAGE_RAISE_PERCENTAGE / 100));
                self.data.age++;
            }
            if (self.data.debt > 0) {
                if (self.data.debtPayment >= self.data.debt) {
                    self.data.debt = 0;
                    self.data.debtPayment = 0;
                } else {
                    self.data.debt = self.data.debt - self.data.debtPayment;
                }
            }
            self.data.savings = self.data.savings + self.calculateSavingsAmount(self.data.salary, self.data.retirementPercentage, self.data.debtPayment);
            self.data.retirementBalance = self.data.retirementBalance + (self.data.retirementBalance * ((RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE / MONTHS_IN_YEAR) / 100)) + (self.data.salary * ((self.data.retirementPercentage / MONTHS_IN_YEAR) / 100));
            
        }, secondsPerMonth * 1000);
    }

    /*
    * Calculate the savings amount given the retirement percentage and the debt payment
    */
    self.calculateSavingsAmount = function (salary, retirementPercentage, debtPayment) {
        var monthlySalary = salary / MONTHS_IN_YEAR;
        var retirementSavings = monthlySalary * (retirementPercentage / 100);
        var taxes = (monthlySalary - retirementSavings) * (TAX_RATE / 100);
        var takeHomePay = monthlySalary - retirementSavings - taxes;
        var expenses = takeHomePay * (INITIAL_COST_OF_LIVING / 100);
        var savings = takeHomePay - debtPayment - expenses;

        return savings;
    }

    /*
    * This is a general compound interest formula that can be reused for different calculations.
    */
    self.calculateCompoundInterest = function (principal, interestRate, months) {
	    var calculation = 1 + ((interestRate / 100) / NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR);
	    calculation = calculation ** (NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR * (months / MONTHS_IN_YEAR));
	    var calculation = calculation * principal;

	    return calculation;
    }

    /*
    * Calculate the amount a person will need for retirement.
    */
    self.calculateAmountNeededForRetirement = function (startingSalary, startingAge) {
    	var numberOfMonthsWorking = (TARGET_RETIREMENT_AGE - startingAge) * MONTHS_IN_YEAR; 
	    var finalSalary = self.calculateCompoundInterest(startingSalary, AVERAGE_RAISE_PERCENTAGE, numberOfMonthsWorking);
	    var amountNeededEachYearInRetirement = finalSalary * (PERCENTAGE_OF_FINAL_INCOME_NEEDED_IN_RETIREMENT / 100);
	    var numberOfYearsInRetirement = TARGET_LIFE_EXPECTANCY - TARGET_RETIREMENT_AGE;
	    var amountNeededForRetirement = amountNeededEachYearInRetirement * numberOfYearsInRetirement;

	    return amountNeededForRetirement;
    }

    /*
    * Calculate the number of months until a person hits the retirement age.
    */
    self.calculateNumberOfMonthsUntilRetirementAge = function (currentAgeInMonths) {
    	var numberOfMonthsUntilRetirementAge = (TARGET_RETIREMENT_AGE * 12) - currentAgeInMonths;
	
	    return numberOfMonthsUntilRetirementAge;
    }

    /*
    * Calculate how much a person's future retirement balance will be in n months.
    */
    self.calculateFutureRetirementBalance = function (startingSalary, existingBalance, retirementContributionPercentage, months) {
	    var balance = existingBalance;
	    var salary = startingSalary;

	    for (var i = 1; i <= months; i++) {
		    balance = balance + (balance * ((RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE / MONTHS_IN_YEAR) / 100));
		
		    /* Add in a salary raise each year */
		    if ((i % MONTHS_IN_YEAR) == 0) {
			    salary = salary + (salary * (AVERAGE_RAISE_PERCENTAGE / 100));
		    }
		
		    /* Add in retirement contribution */
		    balance = balance + ((salary / MONTHS_IN_YEAR) * (retirementContributionPercentage / 100));

	        return balance;
        }
    }

    /*
    * This method will return the number of months in which a person's debt will be paid off.
    */
    self.calculateDebtPayoff = function (initialDebt, startingSalary) {
    	var payment = startingSalary * (PERCENTAGE_OF_SALARY_FOR_DEBT_PAYOFF / 100);
    	var months = initialDebt / payment;
	
	    return months;
    }

    return self;
}]);
