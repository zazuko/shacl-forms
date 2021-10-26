
# shacl-forms

Webcomponent to generate an HTML form from a SHACL shape.


## Usage

```html
<shacl-form .shape="shape" .data="data" .language="language" .languages="languages"></shacl-form>
```

Props:
- `shape`: a clownface pointer to the SHACL shape to render
- `data`: a clownface pointer to the data to edit
- `language` (optional): language used to select labels and descriptions (e.g. `fr` or `['fr', 'en', '*']`)
- `languages` (optional): languages available for language selector (for `rdf:langString` literals)
- `advanced-mode` (optional): show a selector to switch the editor used for each field

Events:
- `submit`: triggered when the form is submitted


## Installation

TODO


## Status

⚠️ This library is very experimental and you should not expect any sort of stability or reliability at this point.
