import {
  Archivo,
  Bricolage_Grotesque,
  EB_Garamond,
  Geist,
  Instrument_Sans,
  Karla,
  Lexend,
  Libre_Franklin,
  Rubik,
} from "next/font/google";

export * as fonts from "./fonts";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

export const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
});

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});
