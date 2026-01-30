DigitalService {
  id
  title
  price
  category
  active
}

module.exports = [
  {
    id: "mobile",
    title: "Mobile Recharge",
    price: 100,
    emoji: "📱",
    active: true
  },
  {
    id: "internet",
    title: "Internet Package",
    price: 250,
    emoji: "🌐",
    active: true
  },
  {
    id: "gift",
    title: "Gift Voucher",
    price: 500,
    emoji: "🎁",
    active: true
  }
];
