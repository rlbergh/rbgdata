---
title: "Designing for Accessibility: Easy Steps to Make Your Tableau Visualizations More Screen Reader-Friendly"
date: "2021-05-31"
updated: "2026-10-05"
excerpt: "In-depth guide on implementing accessibility best practices in Tableau visualizations. Learn concrete steps to make your data accessible to screen reader users."
author: "Rebecca Bergh"
tags: ["Accessibility", "Tableau", "Design"]
---

## The Accessibility Gap

An [estimated](https://ux.stackexchange.com/questions/57340/percentage-of-screen-readers-users-in-usa#:~:text=4.4%20million%20users%20using%20screen%20readers%20in%20the%20USA) 4.4 million people in the United States use a screen reader when they access the internet.

Many data visualizations available online lack basic accessibility and screen reader access. This has become especially apparent as the COVID-19 pandemic has introduced millions of people to interactive charts and graphs. There are hundreds, if not thousands, of beautiful visualizations on Tableau Public alone that are not easily accessible to a decent number of internet users.

Addressing general accessibility is a huge task and I don’t consider myself an expert on that massive topic, so I’ll be focusing specifically on making Tableau visualizations more screen reader-friendly.

Before we get into the steps, I think it’s important to provide a general overview of how screen readers work and how they interact with webpages and those webpage structures.

## Why Accessibility Matters

Before diving into the how, let's talk about why:

1. **It's the right thing to do** - Everyone deserves access to information
2. **It expands your audience** - More people can benefit from your insights
3. **It improves overall design** - Accessibility constraints often lead to clearer visualizations
4. **It may be required** - Depending on your organization or regulatory environment

## Understanding webpage structure

In general, all webpages have a hierarchy of the elements on the page that guide a screen reader user through it, usually using the TAB key on a keyboard. For example: The header above this paragraph is coded as “H2,” meaning it’s the second highest level heading (under the title of this post, which is H1). You can see that by right-clicking on the text and selecting “Inspect” in Chrome. This is important because a screen reader will cycle through headings different from regular paragraphs and other elements. There are many other elements to a webpage, but this is one of the main ones that Tableau uses in its visualizations.

## Easy Steps to Improve Accessibility

### 1. Use baked-in titles

Almost every element in Tableau (worksheets, dashboards, filters, legends, etc.) have a “title” associated with them. I know it’s tempting to hide titles and add a text box to your dashboard (because maybe you want some extra padding between the title and the chart, or you want to make a special title that’s actually a worksheet so some element of it changes with filters), but I strongly recommend using the titles that Tableau bakes in for you (for dashboards as well!) to improve accessibility.

We’ll use [this visualization](https://public.tableau.com/app/profile/rebecca.gourley6411/viz/LeBronJamesSpeedvs_overallimpact/LeBronJamesSpeedvs_overallimpact) as an example. The title of the worksheet in this simple dashboard is “LeBron James: Speed vs. overall impact.” A screen reader is able to identify that text as a header and can relay that information back to the user who may not be able to see it themselves. The same goes for titles on legends, filters, parameter controls, etc. If you find that using titles clutters up your dashboard and you think they aren’t truly necessary (think carefully about what is necessary and what isn’t), you can try changing the font color so that it blends in with your visualization background. This way, the information is still accessible to a screen reader but people who can see your visualization don’t have any unnecessary clutter*.

### 2. Allow data to be downloaded

This might be the most important part of making a data visualization accessible. If a screen reader encounters a worksheet and the underlying data has not been set to allow downloading, the user who can’t see your visualization can’t hear your data either. When a screen reader encounters a visualization where the data has been set to allow downloading, it will prompt the user to press a few keys on their keyboard to open a plain text table that can be read back to them.

Not only should data be downloadable, it should be clean and concise. Many more advanced charts in Tableau require complicated calculations and the data that results isn’t usually easy to understand as plain text. You can see what your data looks like by selecting your marks on the sheet and clicking the “View data” button.

### 3. Use Navigation buttons instead of making custom worksheet buttons

Something I see a lot, and I’ve done a lot to be honest, is to create custom buttons to navigate through dashboards. All worksheets in Tableau are considered a data visualization to a screen reader, regardless of what type of mark it is or what it looks like. It might look like a button to someone who can see it, but to a screen reader, it will appear as a chart and the interactivity of the “button” won’t be readily apparent to the user. Navigation buttons (one of the Dashboard objects) however, are not only usable by a screen reader user, they have great descriptions that are read aloud to the user.

### 4. Alt text on images

This is one of the most basic pieces of web accessibility but it’s important to reiterate. Writing alt text can be tricky but it’s important to be able to convey information that might be not be able to be seen by a screen reader user. I recommend adding alt text to images within your data visualization, but also add alt text to static images of your data visualization when you share them on social media.

#### Basics of writing alt text

- Be descriptive but not wordy
- Don't start it with "image of..." (the screen reader will do that)
- Type out any text you have embedded in the image

>Example:
<img src="/rbgdata/lake-mountain.png" alt="Yellow fall foliage in foreground with a vibrant blue lake below a couple of tree-covered mountains in the background." style="float: left; width: 350px; margin-right: 20px;">
>Alt text: Yellow fall foliage in foreground with a vibrant blue lake below a couple of tree-covered mountains in the background.


### 5. Use Sufficient Color Contrast

Ensure that text and data elements have sufficient contrast:
- Text: 4.5:1 contrast ratio for normal text
- Large text: 3:1 contrast ratio
- Data visualizations: Elements should be distinguishable by color-blind users

Your brand colors are beautiful, but always test them for accessibility:
- Primary teal (#174F5B) on cream (#F7F1E7): ✓ Good contrast
- Coral (#E56B52) on cream: ✓ Good contrast
- Always test with contrast checking tools

### 6. Structure Information Logically

Organize your dashboard for logical navigation:
- Group related information together
- Use clear hierarchies
- Order elements in a reading flow that makes sense
- Consider tab order for interactive elements

### 7. Make Interactive Elements Accessible

If your dashboard includes:
- **Filters** - Label them clearly, ensure keyboard navigation works
- **Tooltips** - Provide alternative ways to access information
- **Buttons** - Make sure they're keyboard accessible with clear focus states

### 8. Provide a Text Summary

Always include a written summary of key insights:
- Explains what the visualization shows
- Highlights key metrics and trends
- Interprets what the data means
- Suggests what actions or decisions the data supports

## The order in which you add things to your dashboard matters

Typically on a webpage, the tab order — or the sequence in which using your TAB key on your keyboard cycles through content — goes from top to bottom. In a Tableau dashboard, the tab order is set by the order in which you add objects to your dashboard. For example: If you add your main element first and then add some KPIs to the top of it later, the tab order that the screen reader will cycle through will go to your main element and then to the KPIs.

This is something I often forget about and then I don’t remember how I added things to the dashboard, so unless I want to completely re-create my dashboard, the order has been fixed. Even though it’s a frustrating process, if you know your audience is going to include a diverse population of people needing accessible accommodations, I highly recommend keeping this in mind when you’re creating a dashboard.

>[Chris DeMartini](https://x.com/demartsc) explains tab order, or focus order, in detail in this [blog post](https://www.datablick.com/blog/2021/2/18/a-tableau-accessibility-journey-part-ii-focus-order).


## Tools to Help You

- **Color Contrast Checker** - [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
- **Color Blindness Simulator** - See how your visualization looks to color-blind users
- **Screen Reader Testing** - Test with NVDA (free, Windows) or JAWS
- **Accessibility Auditing** - Use tools like WAVE or Axe for comprehensive checks

## Testing with Real Users

Full accessibility validation requires testing with real users who rely on assistive technologies. Consider:
- Recruiting users with different disabilities
- Testing with different screen readers
- Getting feedback on navigation and comprehension
- Iterating based on user feedback

## A Practical Example

Let's say you're creating a dashboard showing customer satisfaction scores:

### Without Accessibility Considerations
- A pie chart with only color to distinguish segments
- No alt text
- Unclear title
- No supporting data table

### With Accessibility Considerations
- Title: "Customer Satisfaction Scores by Department - Q3 2021"
- Multiple visualizations: pie chart (visual) + table (data)
- Legend explaining colors and adding patterns
- Alt text describing the distribution
- Text summary: "Customer satisfaction improved 12% in Q3. Best: Sales (92%), Needs improvement: Support (78%)"

## Moving Forward

It’s important to keep in mind the built-in accessible features of Tableau when creating data visualizations. It’s also important to weigh whether you really need a fancy chart type or a hacky workaround for something if it means isolating a section of your audience.

In my opinion, Tableau still has a long ways to go to be truly accessible to all, but practicing some of these steps in your data visualization work can greatly improve the experience that screen reader users have when interacting with data in general. Doing so also creates a more welcoming environment to a large group of people.

The goal isn't perfection — it's progress. Start with these steps, and you'll notice:
- Clearer visualizations for all users
- Better understanding of your data
- A more inclusive approach to data communication

Your data stories deserve to reach everyone. Make them accessible.

## Resources

- [WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tableau Accessibility Best Practices](https://help.tableau.com/current/server/en-us/accessibility.htm)
- [Color Blindness: How to Visualize for All](https://davidmathlogic.com/colorblind/)
