import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { IResultTable } from "@/types/spaylater";

const ResultTables = ({ results }: IResultTable) => {
  return (
    <Card className="shadow-lg">
      <Table className="p-4">
        <TableCaption className="text-center py-4 px-10">
          Disclaimer: The actual amount may vary based on the user input and the
          actual SPayLater plan. Please insert the accurate amount from
          SPayLater to give out the correct estimation.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-300 py-10">
            <TableHead className="text-center">Duration (Month)</TableHead>
            <TableHead>Monthly Installement</TableHead>
            <TableHead className="text-center">Interest Rate</TableHead>
            <TableHead className="text-right">(RM) Amount Charged </TableHead>
            <TableHead className="text-right">(RM) Total Amount </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Object.keys(results).map((month, index) => {
            const resultData = results[month];
            // Check if the resultData object is not empty
            if (Object.keys(resultData).length === 0) {
              return null; // Skip rendering empty objects
            }
            const numericInterestRate = parseFloat(resultData.interestRate);
            const numericInterestBasedOnInput = parseFloat(resultData.interestBasedOnInput);
        
            // Compare the two numeric values
            const selectedInterestRate =
              numericInterestRate === numericInterestBasedOnInput
                ? numericInterestRate
                : numericInterestBasedOnInput;
            return (
              <TableRow
                key={month}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <TableCell className="font-medium text-center">
                  {resultData.month}
                </TableCell>
                <TableCell className="text-center">
                  {resultData.monthInstallement}
                </TableCell>
                <TableCell className="text-center">
                  {selectedInterestRate}
                </TableCell>
                <TableCell className="text-right">
                  {resultData.interestCharged}
                </TableCell>
                <TableCell className="text-right">
                  {resultData.withInterest}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ResultTables;
