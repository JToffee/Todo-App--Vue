 import{ ref} from 'vue'
 import { MobileScreen } from "../util/config.js"
 
 export default function useSetView() {
    const desktopView = ref(false)

    const setView = ()=>{
         if (window.innerWidth >= MobileScreen) {
           desktopView.value = true;
        } else {
          desktopView.value = false;
        }

    } 
    return {desktopView, setView}
    }