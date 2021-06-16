# defining seller and buyer classes
from random import randint
from random import shuffle


class Seller():
    def __init__(self, name, minimumPrice, suggestedPrice):
        self.name = name
        self.minimumPrice = minimumPrice
        self.suggestedPrice = suggestedPrice
        self.previousTransactionSuccess = True


class Buyer():
    def __init__(self, name, maximumPrice, suggestedPrice):
        self.name = name
        self.maximumPrice = maximumPrice
        self.suggestedPrice = suggestedPrice
        self.previousTransactionSuccess = True

# transaction function


def transaction(Seller, Buyer):
    priceDifference = Seller.suggestedPrice - Buyer.suggestedPrice
    if priceDifference <= 2:
        transactionPrice = 0
        transactionPrice += Buyer.suggestedPrice
        if priceDifference <= 0:
            Buyer.suggestedPrice -= 2
            Seller.suggestedPrice += 2
        else:
            Buyer.suggesterPrice = Seller.suggestedPrice
            Seller.suggestedPrice += 2
    else:
        transactionPrice = 0
        Buyer.suggestedPrice += 2
        Seller.suggestedPrice -= 2
    return transactionPrice

# transaction function with printing


def print_transaction(Seller, Buyer):
    priceDifference = Seller.suggestedPrice - Buyer.suggestedPrice
    if priceDifference <= 2:
        transactionSuccess = True
        print("Transaction occured between", Seller.name, "and",
            Buyer.name, "at the price of", str(Seller.suggestedPrice) + ".\n")
        transactionPrice = Seller.suggestedPrice
        if priceDifference <= 0:
            Buyer.suggestedPrice -= 2
            Seller.suggestedPrice += 2
        else:
            Buyer.suggesterPrice = Seller.suggestedPrice
            Seller.suggestedPrice += 2

    else:
        print("Transaction did not occured between", Seller.name, "and", Buyer.name + ". \n" + Seller.name, "suggested",
              str(Seller.suggestedPrice) + ".\n" + Buyer.name, "expected to pay no more than", str(Buyer.suggestedPrice) + ".\n")
        transactionSuccess = False
        Buyer.suggestedPrice += 2
        Seller.suggestedPrice -= 2
    return transactionSuccess

# transaction function only printing the succesful


def print_successful_transaction(Seller, Buyer):
    priceDifference = Seller.suggestedPrice - Buyer.suggestedPrice
    if priceDifference <= 2:
        transactionSuccess = True
        print("Transaction price:", str(Seller.suggestedPrice) + ".")
        if priceDifference <= 0:
            Buyer.suggestedPrice -= 2
            Seller.suggestedPrice += 2
        else:
            Buyer.suggesterPrice = Seller.suggestedPrice
            Seller.suggestedPrice += 2

    else:
        transactionSuccess = False
        Buyer.suggestedPrice += 2
        Seller.suggestedPrice -= 2
    return transactionSuccess


# creating sellers
seller = []
n = 0
while n <= 10:
    p = 20 + n * 2
    seller.append(Seller("Seller"+str(n+1), p, randint(p, 40)))
    n += 1

# creating buyers
buyer = []
m = 0
while m <= 10:
    q = 40 - m * 2
    buyer.append(Buyer("Buyer"+str(m+1), q, randint(20, q)))
    m += 1

# functions for printing sellers and buyers


def print_seller():
    for s in seller:
        print(s.name, s.minimumPrice, s.suggestedPrice)


def print_buyer():
    for b in buyer:
        print(b.name, b.maximumPrice, b.suggestedPrice)


# randomly pair buyers to sellers

# function for printing the pairs

def print_pairings():
    for pair in pairings:
        print(pair[0].name, pair[1].name)


# transactions made
for iteration in range(10):
    print("Day", iteration+1)
    buyerListShuffled = buyer.copy()
    shuffle(buyerListShuffled)
    pairings = []
    for r in range(11):
        pair = [seller[r], buyerListShuffled.pop(0)]
        pairings.append(pair)
    numSuccessTransaction = 0
    sumPrices = 0
    for pair in pairings:
        tradePrice = print_successful_transaction(pair[0], pair[1]) > 0
        if tradePrice:
            numSuccessTransaction += 1
            sumPrices += tradePrice
    print("Day", str(iteration+1), "Successful transactions:",
          numSuccessTransaction, "\n")
