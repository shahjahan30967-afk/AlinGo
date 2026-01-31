function calculateCommission(amount){
  const rate = 2.5;
  const commission = (amount * rate) / 100;
  return {
    platform: commission,
    vendor: amount - commission
  };
}
