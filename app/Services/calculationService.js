/*
 * Module: Retirement Calculations Service
 * Author: David Isovitsch
 */

angular.module("retirementRoad").service('calculationService', ["$interval", function($interval) {

    var self = this;

    var INITIAL_COST_OF_LIVING = 90;
    var INFLATION_PERCENTAGE = 3;
    var AVERAGE_RAISE_PERCENTAGE = 3;
    var RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE = 7;
    var PERCENTAGE_OF_FINAL_INCOME_NEEDED_IN_RETIREMENT = 80;
    var TARGET_RETIREMENT_AGE = 65;
    var TARGET_LIFE_EXPECTANCY = 85;
    var NUMBER_OF_TIMES_INTEREST_IS_COMPOUNDED_PER_YEAR = 12;
    var MONTHS_IN_YEAR = 12;
    var PERCENTAGE_OF_SALARY_FOR_DEBT_PAYOFF = 1;
    var DEBT_MINIMUM_PAYMENT_PERCENTAGE = 1;
    var MAX_GAME_TIME_IN_SECONDS = 240;
    var MAX_RETIREMENT_PERCENTAGE = 15;
    var TAX_RATE = 33;
    var SCORE_WIN_BONUS = 100000;

    self.data = {
        initialSalary: 42500,
        salary: 0,
        initialDebt: 36000,
        debt: 0,
        initialAge: 18,
        age: 0,
        savings: 0,
        retirementBalance: 0,
        retirementPercentage: 6,
        debtPayment: 0,
        month: 0,
        stage: 1,
        paused: false,
        additionDebtPayment: 0
    }

    self.startGame = function() {
        /* Kick-off time cycle */
        self.data.age = self.data.initialAge;
        self.data.salary = self.data.initialSalary;
        self.data.debt = self.data.initialDebt;
        self.data.month = self.data.initialAge * MONTHS_IN_YEAR;
        var secondsPerMonth = MAX_GAME_TIME_IN_SECONDS / self.calculateNumberOfMonthsUntilRetirementAge(self.data.age * MONTHS_IN_YEAR);
        self.data.debtPayment = self.data.debt * (DEBT_MINIMUM_PAYMENT_PERCENTAGE / 100);
        if (self.data.debtPayment < 50) {
            self.data.debtPayment = 50;
        }

        $interval(function() {
            if (!self.data.paused) {
                self.calculateValuesforMonths(1);
            }
        }, secondsPerMonth * 1000);
    }

    self.calculateValuesforMonths = function(months) {
        for (var i = 0; i < months; i++) {
            self.data.month++;
            if ((self.data.month % 12) == 0) {  /* Every year */
                self.data.salary = salaryIncrease(self.data.salary, 1);
                self.data.age++;
            }
            if ((self.data.month % 6) == 0) {
                calculateFinancials(6);
            }
        }

        function salaryIncrease(startingSalary, years) {
            var salary = startingSalary;
            for (var i = 0; i < years; i++) {
                salary = formatNumberForCurrency(salary * (1 + (AVERAGE_RAISE_PERCENTAGE / 100)));
            }
            return salary;
        }

        function calculateFinancials(months) {
            for (var i = 0; i < months; i++) {
                if (self.data.debt > 0) {
                    if (self.data.debtPayment >= self.data.debt) {
                        self.data.debt = 0.00;
                        self.data.debtPayment = 0;
                    } else {
                        self.data.debt = formatNumberForCurrency((self.data.debt - self.data.debtPayment));
                    }
                }
                self.data.savings = formatNumberForCurrency((self.data.savings + self.calculateSavingsAmount(self.data.salary, self.data.retirementPercentage, self.data.debtPayment)));
                if (self.data.savings < 0) {
                    self.data.debt = self.data.debt + (0 - self.data.savings);
                    self.data.savings = 0.00;
                }
                self.data.retirementBalance = formatNumberForCurrency(self.data.retirementBalance + (self.data.retirementBalance * ((RATE_OF_RETURN_ON_INVESTMENT_PERCENTAGE / MONTHS_IN_YEAR) / 100)) + (self.data.salary * ((self.data.retirementPercentage / MONTHS_IN_YEAR) / 100)));
            }
        }
    }

    function formatNumberForCurrency(num) {
        return Number(num.toFixed(2));
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
    self.calculateMonthsUntilDebtPayoff = function () {
        return Math.round(self.data.debt / (self.data.debtPayment + self.data.additionDebtPayment))
    }

    /*
    * Calculate the player's score.
    */
    self.calculateScore = function () {
        var score = 0;

        if (self.isGameWon()) {
            score = score + SCORE_WIN_BONUS;
        }

        if (self.data.debt == 0) {
            score = score + self.data.initialDebt;
        }

        score = score + Math.round(self.data.savings);

        return score;
    }

    /*
    * Determine if the player won the game.
    */
    self.isGameWon = function () {
        var won = false;

        if ((self.data.retirementBalance + self.data.savings - self.data.debt) >= self.calculateAmountNeededForRetirement(self.data.initialSalary, self.data.initialAge)) {
            won = true;
        }

        return won;
    }

    return self;
}]);
