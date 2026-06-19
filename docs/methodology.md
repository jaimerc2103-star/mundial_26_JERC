# Methodology

## Rating System

Team strength is represented using Elo ratings.

## Goal Model

Expected goals are estimated using:

λ = f(Elo Difference)

Goals are generated using:

Poisson(λ)

## Tournament Simulation

1. Simulate remaining group matches
2. Calculate standings
3. Apply FIFA tie-breakers
4. Select best third-place teams
5. Build knockout bracket
6. Simulate until champion

## Monte Carlo

Repeated:

- 10,000
- 100,000
- 1,000,000

times.
