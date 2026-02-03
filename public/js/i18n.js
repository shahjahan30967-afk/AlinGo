export const translations = {
  en: { wallet: "Wallet", balance: "Balance" },
  ur: { wallet: "والٹ", balance: "بیلنس" },
  ar: { wallet: "المحفظة", balance: "الرصيد" }
};

export function t(key) {
  const lang = localStorage.getItem("lang") || "en";
  return translations[lang]?.[key] || key;
}
