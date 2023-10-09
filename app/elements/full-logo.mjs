export default function FullFakebooksLogo({ html, state }) {
  let { position = "", size = "" } = state.attrs;

  let [logoSize, textSize] = {
    sm: [`h-4 w-4`, `text-d-p-sm`],
    lg: [`h-12 w-12`, `text-d-h2`],
  }[size];

  let positionDiv = `flex items-center ${
    position === "center" ? "justify-center" : ""
  } text-[color:#23BF1F]`;

  let fakebooksClassName = `relative top-[1px] ${logoSize}`;

  let fontDisplay = `font-display ${textSize}`;

  return html`
    <div class="${positionDiv}">
      <svg
        class="${fakebooksClassName}"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#23BF1F"
          fill-rule="evenodd"
          d="M12 3a9 9 0 000 18h4.5c1.398 0 2.097 0 2.648-.228a3 3 0 001.624-1.624C21 18.597 21 17.898 21 16.5V12a9 9 0 00-9-9zm-4 8a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm3 4a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>

      <div class="w-1"></div>
      <div class="${fontDisplay}">Fakebooks</div>
    </div>
  `;
}
