export default function InvoicesInfo({ html, state }) {
  const { currencyFormatter } = state.store;
  const { label = "", right = false, amount = 0 } = state.attrs;

  return html`
    <div class=${right ? "text-right" : ""}>
      <label-text label="${label}"></label-text>
      <div class="text-[length:18px] text-black">
        ${currencyFormatter.format(Number(amount))}
      </div>
    </div>
  `;
}
