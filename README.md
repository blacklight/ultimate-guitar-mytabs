# ultimate-guitar-mytabs

This browser script allows you to scrape and download your saved UltimateGuitar tabs to JSON format.

There are two ways to use the `ug.js` script:

1. Install it as a Greasemonkey script (or whatever extension you use for custom UserScript).
   Every time you browse to your UltimateGuitar page, the Download button will appear next to
   the header.

2. Manually paste the code in the browser developer console - the button will be added on the
   fly. You can also manually call `getTabs` from the developer console to access, filter
   and manipulate the list of objects.

![Screenshot](https://i.ibb.co/WPmwQbT/837c447a43af.png)

Note that the script will download all the tabs on the current page. If you want to download all
of your tabs, then select _All_ from the top filter. The current order of the tabs on the page is
also preserved in the downloaded JSON.

## Convert to CSV

If you want to convert the downloaded JSON to CSV, you can do so by using the `json2csv.py` script.
Usage:

```shell
$ python json2csv.py -i tabs.json -o tabs.csv
# Or
$ python json2csv.py < tabs.json > tabs.csv
```
