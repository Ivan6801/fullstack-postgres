import { AuthProvider } from "./context/ authContext";
import { Routers } from "./router/routes";

function App() {
  return (
    <AuthProvider>
      <Routers />
    </AuthProvider>
  );
}

export default App;
