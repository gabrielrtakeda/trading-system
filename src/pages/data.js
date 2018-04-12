let tradeId = 1
const trade = (perc, invest) => ({ id: tradeId++, perc, invest })

export const trades = [
  trade(81, 385.44),
  trade(78, 385.44),
  trade(88, 570.46),
  trade(88, 570.46),
  trade(73, 385.44),
  trade(0, 385.44),
  trade(88, 570.46),
  trade(88, 570.46),
  trade(88, 570.46),
  trade(88, 570.46),
  trade(88, 570.46),
  trade(88, 570.46),
  trade(88, 570.46),
]

const simulate = (perc, invest, gain) => ({ perc, invest, gain })

export const simulations = perc => [
  simulate(perc, 385.44, 308.35),
  simulate(perc, 570.45, 456.36),
  simulate(perc, 844.27, 675.42),
  simulate(perc, 1249.52, 999.62),
  simulate(perc, 1849.30, 1479.44),
  simulate(perc, 2736.96, 2189.57),
  simulate(perc, 4050.71, 3240.57),
  simulate(perc, 5995.05, 4796.04),
  simulate(perc, 8872.68, 7098.14),
  simulate(perc, 13131.57, 10505.25),
  simulate(perc, 19434.72, 15547.78),
  simulate(perc, 28763.39, 23010.71),
]
