---
title: "Understanding Calculated Fields in Tableau"
date: "2026-10-04"
excerpt: "Learn how to create and use calculated fields to extend your Tableau analysis with custom formulas."
author: "Rebecca Bergh"
tags: ["Tableau", "Formulas", "Tutorial"]
---

## What Are Calculated Fields?

Calculated fields in Tableau allow you to create new fields using formulas based on existing data. They're a powerful way to extend your analysis without modifying the underlying data source.

## Example Formulas

Here are some common calculated fields you might use:

{field:Profit Ratio|[Profit] / [Sales]}

{field:Sales by Year|YEAR([Order Date])}

{field:High Value Order|IF [Sales] > 1000 THEN "Yes" ELSE "No" END}

{field:Running Total|RUNNING_SUM(SUM([Sales]))}

## Creating Your First Calculated Field

To create a calculated field in Tableau:

1. Click Analysis on the top menu bar, then select Create Calculated Field... 
    - Or: `ALT + A + C`
3. Name your field
4. Write your formula
5. Click OK

The formulas use Tableau's calculation language, which includes functions for:
- **Aggregation**: SUM, AVG, COUNT, MIN, MAX
- **String functions**: UPPER, LOWER, LEN, CONTAINS
- **Date functions**: YEAR, MONTH, DAY, DATEDIFF
- **Logical functions**: IF, CASE, WHEN
- **Spatial functions**: MAKEPOINT, MAKELINE, BUFFER, DISTANCE

## Tips and Tricks

- Test your formulas in small steps
- Use the syntax hints as you type
- Remember that field names go in square brackets
- String values go in single quotes

Happy calculating!
