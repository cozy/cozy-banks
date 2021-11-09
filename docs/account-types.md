# Account types

Here is the complete list of the account types managed by the app:

* Asset
* Bank
* Capitalisation
* Cash
* Checkings
* ConsumerCredit
* CreditCard
* Credit Card
* Deposit
* Joint
* Liability
* LifeInsurance
* Loan
* Madelin
* Market
* Mortgage
* PEA
* PEE
* RevolvingCredit
* RSP
* Savings
* Other
* Unkown
* None
* Credit card
* Perco
* Perp
* Article83

## Mapping

Some types are dynamically mapped to other types:

<table>
  <thead>
    <tr>
      <th>Original type</th>
      <th>Mapped type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Article83`</td>
      <td rowspan="10">`LongTermSavings`</td>
    </tr>
    <tr>
      <td>`LifeInsurance`</td>
    </tr>
    <tr>
      <td>`Madelin`</td>
    </tr>
    <tr>
      <td>`Market`</td>
    </tr>
    <tr>
      <td>`Mortgage`</td>
    </tr>
    <tr>
      <td>`PEA`</td>
    </tr>
    <tr>
      <td>`PEE`</td>
    </tr>
    <tr>
      <td>`Perco`</td>
    </tr>
    <tr>
      <td>`Perp`</td>
    </tr>
    <tr>
      <td>`RSP`</td>
    </tr>
    <tr>
      <td>`Asset`</td>
      <td rowspan="3">`Business`</td>
    </tr>
    <tr>
      <td>`Capitalisation`</td>
    </tr>
    <tr>
      <td>`Liability`</td>
    </tr>
    <tr>
      <td>`Bank`</td>
      <td rowspan="3">`Checkings`</td>
    </tr>
    <tr>
      <td>`Cash`</td>
    </tr>
    <tr>
      <td>`Deposit`</td>
    </tr>
    <tr>
      <td>`ConsumerCredit`</td>
      <td rowspan="2">`Loan`</td>
    </tr>
    <tr>
      <td>`RevolvingCredit`</td>
    </tr>
    <tr>
      <td>`Credit card`</td>
      <td>`CreditCard`</td>
    </tr>
    <tr>
      <td>`None`</td>
      <td rowspan="2">`Other`</td>
    </tr>
    <tr>
      <td>`Unkown`</td>
    </tr>
  </tbody>
</table>
