import { Notifyer } from "./Notifyer.js";
import { Timer } from "./Timer.js";
import { Emitter } from "./Emitter.js";

const M = 1;// Minutes

const notify = Notifyer.notify({
  title: "Aviso",
  body: "Alguma mensagem de aviso !",
});

const App = {
  async start() {
    try {
      await Notifyer.init();

      Emitter.on("countdown-start", notify);
      Emitter.on("countdown-end", Timer.init);

      Timer.init( M * 60);
    } catch (err) {
      console.log(err.message);
    }
  },
};

export { App };
