class PostComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                /* 组件样式 */
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                h1 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.5;
                }
            </style>
            <h1></h1>
            <div class="content"></div>
        `;
    }

    connectedCallback() {
        // 组件被添加到文档中时执行
        this.render();
    }

    render() {
        // 从属性中获取数据
        const title = this.getAttribute('post-title');
        const content = this.getAttribute('post-content');
        // 将数据渲染到组件中
        this.shadowRoot.querySelector('h1').textContent = title;
        this.shadowRoot.querySelector('.content').innerHTML = content;
    }
}

customElements.define('post-component', PostComponent);
