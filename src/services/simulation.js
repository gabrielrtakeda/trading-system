const simulate = (quantity, percentual, amount, retentionPercentual = 0.60) => {
  const prev = {
    retain: 0,
    investiment: amount,
  }

  const simulation = []
  for (let i = quantity - 1; i >= 0; i--) {
    const investiment = prev.investiment + prev.retain
    const gain = investiment * percentual
    const total = investiment + gain
    const retain = gain * retentionPercentual

    prev.retain = retain
    prev.investiment = investiment

    simulation.push({ investiment, total, gain, retain })
  }

  return simulation
}

export default simulate
