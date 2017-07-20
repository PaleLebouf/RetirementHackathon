/*
 * Module: Retirement Calculations Service
 * Author: David Isovitsch
 */

angular.module("retirementRoad").service('calculationService', function() {

    var self = this;

    var INITIAL_COST_OF_LIVING = 35;
    var INFLATION_PERCENTAGE = 3;
    var AVERAGE_RAISE_PERCENTAGE = 3;
    var RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE = 7;
    var PERCENTAGE_OF_FINAL_INCOME_NEEDED_IN_RETIREMENT = 85;
    var TARGET_RETIREMENT_AGE = 65;
    var TARGET_LIFE_EXPECTANCY = 85;
    var NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR = 12;
    var MONTHS_IN_YEAR = 12;
    var PERCENTAGE_OF_SALARY_FOR_DEBT_PAYOFF = 1;
    var MAX_GAME_TIME_IN_SECONDS = 300;

    self.startingSalary = 0;
    self.salary = self.startingSalary;
    self.initialDebt = 0;
    self.debt = self.initialDebt;
    self.initialAge = 18;
    self.age = self.initialAge;

    self.month = 0;

    function updateMonth() {
    }

    self.startGame = function() {
        /* Kick-off time cycle */
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
    * Calculate the amount a person will need for retirement.  Per Mark, a person will need about 80 - 85% of their 
    * final salary each year in retirement.
    */
    self.calculateAmountNeededForRetirement = function (startingSalary, startingAge) {
    	var numberOfMonthsWorking = (TARGET_RETIREMENT_AGE - startingAge) * MONTHS_IN_YEAR; 
	    var finalSalary = calculateCompoundInterest(startingSalary, AVERAGE_RAISE_PERCENTAGE, numberOfMonthsWorking);
	    var amountNeededEachYearInRetirement = finalSalary * (PERCENTAGE_OF_FINAL_INCOME_NEEDED_IN_RETIREMENT / 100);
	    var numberOfYearsInRetirement = TARGET_LIFE_EXPECTANCY - TARGET_RETIREMENT_AGE;
	    var amountNeededForRetirement = finalSalary * numberOfYearsInRetirement;

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
    self.calculateFutureRetirementBalance = function (existingBalance, months) {
    	var calculation = 1 + ((RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE / 100) /  NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR);
	    calculation = calculation ** (NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR * (months / MONTHS_IN_YEAR));
	    var balance = calculation * existingBalance;

	    return balance;
    }

    /*
    * This method will return the number of months in which a person's debt will be paid off.
    */
    self.calculateDebtPayoff = function (initialDebt, startingSalary) {
    	var payment = startingSalary * (PERCENTAGE_OF_SALARY_FOR_DEBT_PAYOFF / 100);
    	var months = initialDebt / payment;
	
	    return months;
    }

});
