import type { ReactNode, CSSProperties } from 'react';

/** Eén menu-extra onder naam/e-mailadres, boven "Uitloggen". Rendert als <a>
 * wanneer href is gezet, anders als <button>. */
export interface PlatformBalkMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Gedeelde platformbalk voor hub, gids en VIA | Collect (vic-platform#61).
 */
export interface PlatformBalkProps {
  /** Appnaam naast het VIC-beeldmerk (bv. "Innovatieveld", "VIA | Collect").
   * Optioneel — valt als eerste weg op een smal scherm. Logo en accountrondje
   * blijven altijd staan. */
  appNaam?: string;
  /** Naam van de ingelogde gebruiker, getoond boven in het accountmenu. */
  naam: string;
  /** E-mailadres van de ingelogde gebruiker, getoond onder de naam. */
  email: string;
  /** Uitlog-URL — gebruikt wanneer er geen `onUitloggen` is opgegeven
   * (rendert "Uitloggen" dan als <a href={uitlogUrl}>). */
  uitlogUrl?: string;
  /** Callback voor uitloggen — heeft voorrang op `uitlogUrl` (rendert
   * "Uitloggen" dan als <button>). Voor apps met een eigen uitlogstap vóór de
   * navigatie (bv. VIA | Collect's /auth/logout-aanroep). */
  onUitloggen?: () => void;
  /** App-eigen items in het accountmenu, tussen naam/e-mailadres en
   * "Uitloggen" (bv. "Beheer" in de gids, "Wachtwoord wijzigen" in
   * VIA | Collect). */
  menuExtras?: PlatformBalkMenuItem[];
  /** URL van de hub — logo-klik gaat hier altijd naartoe. Default:
   * 'https://veenweiden.online'. */
  hubUrl?: string;
  /** App-eigen knoppen in het midden van de balk (bv. taalknop, navigatie). */
  children?: ReactNode;
  /** Extra class(es), toegevoegd naast (niet in plaats van) de
   * vic-platformbalk-klasse. */
  className?: string;
  style?: CSSProperties;
}

export declare function PlatformBalk(props: PlatformBalkProps): JSX.Element;
