# Calculated Field Display

Display Tableau calculated fields with proper formatting and a copy button for easy sharing!

## Using the Component in Markdown

Use the `{field:...}` syntax to display a calculated field with name and formula:

```markdown
{field:Sales_Growth|IF [Year] = YEAR(TODAY()) THEN [Sales] * 1.1 ELSE [Sales] END}
```

**Format:**
```
{field:FieldName|Formula Here}
```

- **FieldName**: The name of your calculated field (shown in gold)
- **Formula**: The Tableau formula (shown in a code block)

## Examples

### Simple Calculation
```markdown
{field:Total_Sales|SUM([Sales])}
```

### Conditional Logic
```markdown
{field:Regional_Adjustment|IF [Region] = "West" THEN [Sales] * 1.1 ELSE [Sales] END}
```

### Complex Nested Formula
```markdown
{field:Sales_Category_Discount|CASE [Product Category]
  WHEN "Technology" THEN [Sales] * 0.15
  WHEN "Furniture" THEN [Sales] * 0.10
  WHEN "Office Supplies" THEN [Sales] * 0.05
  ELSE 0
END}
```

## Features

✅ **Field Name** - Displayed in gold at the top  
✅ **Copy Button** - Users can copy the formula with one click  
✅ **Syntax Highlighting** - Code block styling  
✅ **Mobile Friendly** - Button adapts to screen size  
✅ **Accessible** - Keyboard and screen reader support  

## Display

The component renders as:

- **Header**: Field name in gold with "Copy" button (teal background)
- **Body**: Formula in code block with charcoal background
- **Copy Button**: Shows "📋 Copy" normally, "✓ Copied!" after clicking

## In Your Blog Posts

Example blog post snippet:

```markdown
---
title: "Creating a Sales Growth Calculation"
date: "2024-01-20"
excerpt: "How to build dynamic sales calculations in Tableau"
tags: ["Tableau", "Calculations", "Tutorial"]
---

## Sales Growth Calculation

To track year-over-year sales growth, I created this calculated field:

{field:Sales_Growth|IF [Year] = YEAR(TODAY()) THEN [Sales] * 1.1 ELSE [Sales] END}

This formula compares current year sales to the previous baseline, applying a 10% adjustment factor.

## Regional Adjustments

Different regions have different growth targets:

{field:Regional_Adjustment|IF [Region] = "West" THEN [Sales] * 1.1 ELSE [Sales] END}

The West region gets a higher adjustment due to market conditions.
```

## Styling Details

The component uses your brand colors:
- **Border**: Gold (#D6a84B) - left accent line
- **Button**: Teal (#174F5B) on hover → Coral (#E56B52)
- **Text**: Gold field names on charcoal background
- **Code**: Monospace font with F7F1E7 text on dark background

## Tips

1. **Keep field names descriptive** - Use underscores for readability
2. **Use multi-line for complex formulas** - Easier to read
3. **Add context before/after** - Explain what the field does
4. **Test in preview** - Make sure formatting looks right

---

Use `{field:...}` syntax to make your Tableau formulas shine! 🎨
