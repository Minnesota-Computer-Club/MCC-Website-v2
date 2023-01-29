# Header Component

The Header component contains the entire header portion of the website. This includes the header logo,  menu, Discord CTA, and the mobile header menu.

## Usage

**Note: The Header is automatically baked into every page on the site. This is accomplished by adding to the page template found at `/pages/_app.js`.**

If for some reason you explicitly add the Header to an additional page, the following code demonstrates that.

```jsx
import Header from '/components/Header';

export default function Example(props) {
  return (
    <Header />
  );
}
```

### Props

**Required props are marked with `*`.**

| Name                   | Type      | Default                       | Description                                                                        |
| ---------------------- | ----------| ----------------------------- | ---------------------------------------------------------------------------------- |
| `className`            | `string`  | ``                            | A string of CSS classes that you want to apply to the header wrapper `<div>`.                      |


### Additional Usage Information

#### Adding or Modifying a Link on the Header Menu
The Header menu is defined in `navigationItems` which is an array that is maintained in `/components/utils.js`. 
- The Header only displays links from that `navigationItems` array where the `includeInHeader` property is set to `true`.
- Navigation items where `subItems` has a length != 0 will be displayed as a dropdown.
- Dropdown links (anything listed under the `subItems` property in `navigationItems`) are **not** displayed in the mobile menu. If you want to display one of the dropdowns in the mobile menu, you will need to add an additional listing for it and set `includeInFooter: true` and `includeInHeader: false`. The WCC Leaderboard menu item is an example of this.

### General Guidelines & Recommendations

- You should never need to add the Header to your page since it is baked into the page template. However, if you do need to add it to a page make sure that you add it above the rest of the content that is found on that page.
- This component was built using a Headless UI `Popover` component. More documentation on that component can be found here: [https://headlessui.com/react/popover](https://headlessui.com/react/popover)

## Related Components

- `Footer` - Defined in `/components/Footer/index.js`.
- `navigationItems` - Defined in `/components/utils.js`.
  - Contains the navigation items that should be displayed in our `Header` and `Header` components.