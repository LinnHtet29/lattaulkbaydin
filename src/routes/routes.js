import Home from "../components/Home";
import AnsSelect from "../components/AnsSelect";
import ShowAns from "../components/ShowAns";

export default [
  { path: "/", component: Home },
  { path: "/:id", component: AnsSelect },
  { path: "/answer/:no/:number", component: ShowAns }
];
