# Welcome to my table plugin

This table plugin was made for a project, it's probably not the best out there but i'm pretty proud of it

## How to install

Run the following command:`npm install table-component`

### How to use it

If you're crazy enough to try and use this plugin, its quite simple, it just adds a `<Table/>` component to which you'll have to pass data and header value as arrays of object,
per exemple `data = [{name:yourname}]`
and header with keys matching the data `header = [{title:'Names',key:'name'}]`, title being the text on the header.
then passing those two as props like `<Table data={data} header={header}/>`
