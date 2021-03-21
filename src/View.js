const View = {
  render({ minutes, seconds }) {
    document.body.innerHTML = `
      <div id="widget">
        <span>${minutes}:${seconds}</span>
      </div>
      `;
  },
};

export { View };
