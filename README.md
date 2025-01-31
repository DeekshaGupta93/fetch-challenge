# Receipt Processor

The **Receipt Processor** service processes purchase receipts to calculate reward points. It accepts receipt data via a POST endpoint, applies rules to determine points, and returns a receipt ID.

A GET enpoint can be used to retrieve the points for a given receipt ID.

## Running the service with Docker Compose

1. **Install docker and Docker Compose**

   Ensure that both Docker and Docker Compose are installed on your machine

2. **Clone the repository**

```
git clone https://github.com/DeekshaGupta93/fetch-challenge.git
cd fetch-challenge

```

3. **Start the service**

   Run the following command in the root directory of the repository:

```
docker compose run fetch-challenge

```

**Note:** If you encounter any errors in starting up the service and you are on Mac machine with Apple Silcone, run the following command:

```
docker compose run fetch-challenge-m1

```

## Run Unit tests

Run the following command in the root directory of the repository to run unit tests:

```
docker compose run fetch-challenge-tests

```
