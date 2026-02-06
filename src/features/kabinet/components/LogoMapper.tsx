import LogoAksayapatra from "./LogoAksayapatra"
import LogoGeloraHarmoni from "./LogoGeloraHarmoni"

export function LogoMapper({kabinet}:{kabinet:string}) {
  switch(kabinet) {
    case 'gelora-harmoni': return <LogoGeloraHarmoni />
    case 'aksayapatra': return <LogoAksayapatra />
  }
}