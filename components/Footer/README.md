# Footer Component

The Footer component contains the entire footer portion of the website. This includes the footer menu, dark/light mode button, and the copyright information at the bottom of the website.

## Usage

**Note: The Footer is automatically baked into every page on the site. This is accomplished by adding to the page template found at `/pages/_app.js`.**

If for some reason you explicitly add the Footer to an additional page, the following code demonstrates that.

```jsx
import Footer from '/components/Footer';

export default function Example(props) {
  return (
    <Footer />
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default                       | Description                                                                        |
| ---------------------- | ----------| ----------------------------- | ---------------------------------------------------------------------------------- |
| `className`            | `string`  | ``                            | A string of CSS classes that you want to apply to the footer.                      |


### Additional Usage Information

#### Adding or Modifying a Link on the Footer Menu
The Footer menu is defined in `navigationItems` which is an array that is maintained in `/components/utils.js`. The Footer only displays links from that `navigationItems` array where the `includeInFooter` property is set to `true`. Also note that dropdown links (anything listed under the `subItems` property in `navigationItems`) are **not** displayed in the footer or the mobile header menu.

### General Guidelines & Recommendations

- You should never need to add the Footer to your page since it is baked into the page template. However, if you do need to add it to a page make sure that you add it below the rest of the content that is found on that page.

## Related Components

- `Header` - Defined in `/components/Header/index.js`.
- `navigationItems` - Defined in `/components/utils.js`.
  - Contains the navigation items that should be displayed in our `Header` and `Footer` components.