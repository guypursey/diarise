# diarise

Getting dates in order, for those with imperfect timing

## Aims

Diarise has three main aims:

 1. **Plain-text date- and time- stamps**: Devise a plain-text notation and functions for handling dates and times, such that:
     - We can use it to express uncertainty about dates and times
     - Lexical order = chronological order
 2. **Helper functions**: Create helper functions that
     - Automate homogenisation of dates and times where needed making plain-text transcription easier
     - Convert plain text to special types or classes of object and back again
 3. **Calendar grammar**: Enable a calendar grammar so that
     - The conventions and functions created are clearly documented
     - We can easily devise similar conventions for alternative or fantasy calendars

## 1. Plain-text date- and time-stamps

Conversion and sorting of dates cross many tools is inconsistent and unintuitive.

<details>
<summary>Example: Google Sheets</summary>
Let's say that you have a list of dates and times that you want to put in order.

If you have complete dates and you put them into a spreadsheet (say Google Sheets), the tool will generally convert them into a special date-time format for you.

You can even format them to appear as you need them to.

![By going to "Format" in the menu, and then "Number" you can choose from preset or custom date formats.](./img/example-google-sheets-date-format-change.gif)

But if there is any uncertainty around your date, you may become stuck.

Let's say you know about an event in May 2023 but you don't know when.

So you type `2023/05`.

Google Sheets will interpret that as 1st May 2022 for you. It will still sort okay, after April 2023 but before more specific dates in May 2023. And it will continue to display `2023/05`.

But the uncertainty itself is easily lost. If you format the entire column in the same way, you lose the formatting and the more general vagueness you were trying to express with your date.

![You can see the specific date Google Sheets has inferred from in the formula bar, by opening the calendar view in the actual cell, and by changing the format for the cell or the entire column.](./img/example-google-sheets-less-specific-date.gif)

And if you mark the date with something outside the date conventions that Google can't interpret then it will be treated differently to the rest of the column and then won't sort intuitively.

Likewise if you know of an event in 2023 and put that in your column and sort, you'll find it's put in above the original. (and if you format the whole column you'll see the date it has stored is actually 14th July 1905).
</details>

One aim of this project is to come up with a set of conventions that allow you to record a date up to a required level of specificity and still be able to sort it meaningfully.


## 2. Helper functions

It should be possible to convert a plain-text date into a standard JavaScript date object if needed, or into other formats.

There might even be custom formats that preserve the uncertainty while still provided a cross-compatible date object amongst the properties, that can then be used in graphing and data visualisation.

## 3. Calendar grammar

With any set of conventions there's at the very least an implicit grammar at work.

This project aims not only to make that grammar explicit but also allow users to leverage it to create their own calendar systems.

For example, one might want to an easy notation for the French Revolutionary Calendar if working with documents from that time. Or one might want a notation for the Shire Calendar from Tolkien's _Lord of the Rings_.
