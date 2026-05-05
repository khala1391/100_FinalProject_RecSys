---
name: revise-dax-powerbi
description: "Revise, optimize, and debug DAX in Power BI. Use when: reviewing DAX measures or calculated columns, fixing DAX errors, optimizing slow DAX queries, refactoring DAX for readability, rewriting bad DAX patterns, auditing implicit measures, reviewing nested CALCULATE or FILTER, DAX code review, improve DAX performance, Power BI DAX audit."
argument-hint: "Path to a .dax or exported DAX text file in the workspace (e.g. reports/sales.dax)"
---

# Revise DAX in Power BI

## When to Use

- Review and improve existing DAX measures or calculated columns
- Optimize DAX expressions that run slowly in Power BI reports
- Refactor DAX for readability and consistent naming conventions
- Debug measures that return incorrect results or errors
- Rewrite anti-patterns (implicit measures, nested CALCULATE, IFERROR abuse, etc.)
- Full DAX audit before publishing a Power BI report

## Input Expectations

Provide a workspace-relative path to a `.dax`, `.txt`, or any plain-text file containing exported DAX. 

> **Note on .pbix files:** `.pbix` is a binary format. To extract DAX, open Power BI Desktop → View → DAX Query View → copy measure definitions, or use Tabular Editor to export as `.dax` files. Then point this skill at the exported file.

---

## Procedure

### Step 1 — Read the DAX

Read the full contents of the file at the provided path using the file-reading tool. If the file contains multiple measures or calculated columns, list them first so the user can confirm scope.

---

### Step 2 — Full Review Checklist

Work through **all four categories** in order. For each issue found, note:
- The measure/column name
- The category (Errors, Performance, Readability, Anti-pattern)
- A one-line description of the problem

#### A. Errors & Correctness

- [ ] Syntax errors (missing brackets, mismatched parentheses, wrong argument count)
- [ ] Row context vs. filter context confusion (e.g., using a column reference where a measure is needed)
- [ ] `RELATED` / `RELATEDTABLE` called in the wrong direction across relationships
- [ ] Time intelligence functions (`DATESYTD`, `SAMEPERIODLASTYEAR`, etc.) used without a marked date table
- [ ] Division without `DIVIDE` — potential division-by-zero runtime error
- [ ] `BLANK()` comparisons using `= BLANK()` instead of `ISBLANK()`

#### B. Performance

- [ ] `FILTER(ALL(Table), condition)` or `FILTER(Table, condition)` where a simpler filter argument inside `CALCULATE` would suffice
- [ ] `COUNTROWS(FILTER(...))` → prefer `CALCULATE(COUNTROWS(...), filter)`
- [ ] Column references inside iterators (`SUMX`, `AVERAGEX`, `MAXX`, etc.) that scan large tables unnecessarily
- [ ] Overuse of `ALLSELECTED` in deeply nested measures
- [ ] Measure chains deeper than 3 levels without intermediate `VAR` caching
- [ ] `EARLIER` used where a `VAR` + iterator pattern is clearer and faster

#### C. Readability & Conventions

- [ ] Repeated sub-expressions not extracted into `VAR` variables
- [ ] Measure names that don't follow a consistent convention (recommended: `[Title Case With Spaces]`)
- [ ] Magic numbers or string literals not extracted into named variables or helper measures
- [ ] `VAR` / `RETURN` blocks not separated by blank lines
- [ ] No `//` comments on non-obvious logic or business rules
- [ ] Inconsistent indentation (each function argument should be on its own line, indented 4 spaces)

#### D. Anti-Patterns

- [ ] Implicit measures (fields used directly in visuals without an explicit measure definition)
- [ ] Nested `CALCULATE` calls that can be flattened by passing multiple filter arguments to a single `CALCULATE`
- [ ] `IF(ISBLANK(x), 0, x)` → prefer `x + 0` or `COALESCE(x, 0)`
- [ ] `IFERROR(expression, 0)` wrapping an entire expression (hides real errors; fix root cause instead)
- [ ] Using `=` for filter override inside `CALCULATE` instead of explicit filter functions (`ALL`, `KEEPFILTERS`, etc.)
- [ ] Calculated columns where a measure would be more appropriate (and vice versa)

---

### Step 3 — Produce the Revised DAX

For **each** measure or calculated column that has issues:

1. Output the **full rewritten DAX** (never a partial snippet — always the complete expression).
2. Add `//` inline comments on **every changed or non-obvious line** explaining *why* the change was made.
3. Separate `VAR` declarations from `RETURN` with a blank line.
4. Group related measures together under a `-- Section: <Topic>` separator comment.

**Output format:**

```dax
-- Measure: [Sales YTD]
[Sales YTD] =
VAR _ytdSales =
    CALCULATE(
        SUM(Sales[Amount]),               // aggregate at row granularity
        DATESYTD('Date'[Date])            // requires a marked Date table
    )
RETURN
    DIVIDE(_ytdSales, 1, 0)              // DIVIDE avoids division-by-zero; safe default = 0
```

---

### Step 4 — Summary Table

After all revisions, output a Markdown summary:

| Issue Category     | Issues Found | Examples                              |
|--------------------|:------------:|---------------------------------------|
| Errors / Correctness | n          | e.g., missing DIVIDE, wrong context   |
| Performance        | n            | e.g., FILTER on large table           |
| Readability        | n            | e.g., no VAR, no comments             |
| Anti-patterns      | n            | e.g., nested CALCULATE, IFERROR abuse |

Finish with a one-sentence overall assessment and the highest-priority fix to make first.
