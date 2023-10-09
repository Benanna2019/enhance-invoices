export default function LabelText({ html, state }) {
  const { label = "" } = state.attrs;
  return html`
    <div class="text-[12px] font-medium uppercase leading-[24px] text-gray-400">
      ${label}
      <slot name="label-text-children" as="div"></slot>
    </div>
  `;
}
