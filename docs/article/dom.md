# 页面上特定点的元素

使用 JavaScript 确定元素在页面上的位置可能很棘手。在处理指针事件或其他形式的用户输入时，经常会出现此类需求。正如预期的那样，这种常见问题有许多不同的可行解决方案，使用成熟的 Web API。

正如我最近发现的，[Document.elementFromPoint()](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementFromPoint) 提供了一个相当有趣而直接的解决方案。它允许你获取页面上特定点的元素，而且还能很好地与 iframe 配合使用。此外，[Document.elementsFromPoint()](https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint) 也提供了类似的功能，但它返回的是一个数组，其中包含页面上某一特定点的所有元素，并按其 z-index 顺序排列。

```typescript
// Returns the topmost element at the specified coordinates
const element = document.elementFromPoint(x, y);

// Returns an array of all the elements at the specified coordinates
const elements = document.elementsFromPoint(x, y);
```

# document 或 document.documentElement 的区别？

`document` 和 `document.documentElement` 在 JavaScript 中代表不同的概念，尽管它们都是文档对象模型（DOM）的一部分，用于访问和操作网页内容。下面是它们之间的主要区别：

### `document`

- `document` 代表整个 HTML 或 XML 文档，并作为文档树的入口点。它是 `Document` 对象的一个实例，提供了访问和操作整个文档内容的接口，包括查找元素、创建新元素、处理事件等。
- `document` 对象是全局对象的一部分，可以直接访问，不需要从其他对象中获取。
- 它包含了文档中所有的元素，包括 `<html>`、`<head>` 和 `<body>` 等。
- `document` 对象提供了大量的方法和属性，用于与文档的内容和结构进行交互，如 `getElementById`、`createElement`、`addEventListener` 等。

### `document.documentElement`

- `document.documentElement` 指向文档的根元素，对于 HTML 文档，这通常是 `<html>` 元素。
- 它是文档树中的一个特定节点，具体来说是 `Element` 对象的一个实例，代表了文档的最顶层元素。
- 通过 `document.documentElement`，你可以直接访问和操作 `<html>` 元素的属性和方法，例如获取或设置文档的宽高、处理与根元素相关的事件等。
- 在操作 DOM 或处理与整个页面的布局和尺寸相关的问题时，`document.documentElement` 很有用。例如，你可以使用 `document.documentElement.scrollTop` 或 `document.documentElement.scrollHeight` 来获取或控制页面的滚动位置。

简而言之，`document` 是整个文档的代表，提供了广泛的方法和属性用于文档的操作和事件处理；而 `document.documentElement` 是对文档根元素的直接引用，通常用于直接访问和操作 `<html>` 元素的属性和方法。两者的使用取决于你的具体需求，比如修改文档结构或内容时使用 `document`，而处理与页面布局或尺寸相关的功能时使用 `document.documentElement`。

## 给浏览器绑定任意位置的点击事件

为了在浏览器的任意位置绑定点击事件并获取点击的坐标位置，理想的做法是将 `addEventListener` 绑定给 `document` 或 `document.documentElement` 而不是 `document.body`。

这里是为什么：

1. **`document.documentElement`** 指的是整个文档的根元素，对于 HTML 文档来说，这通常是 `<html>` 元素。绑定事件监听器到 `document.documentElement` 可以确保在文档的任何地方（包括 `<head>` 和 `<body>` 之外的区域）点击都能被捕获。

2. **`document.body`** 仅代表文档的 `<body>` 部分，这意味着如果点击发生在 `<body>` 元素之外的地方（虽然这种情况不常见，但在某些布局或样式下可能发生），事件可能不会被 `document.body` 捕获。

3. **`document`** 代表整个文档。在 `document` 上绑定事件监听器同样可以捕获到文档中任何位置的点击事件，包括 `document.documentElement` 和 `document.body`。实际上，监听 `document` 上的事件通常是捕获全局事件的推荐方法，因为它确保了即使在文档结构变化（例如，动态内容加载）的情况下，事件监听器仍然有效。

因此，为了最大范围地捕获点击事件并获取其坐标位置，最好的选择是使用 `document` 或 `document.documentElement`。这样可以确保无论用户在文档的哪个部分点击，都能够捕获到这个事件。使用 `document` 是最常见和推荐的做法，因为它代表了整个文档。