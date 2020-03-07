# Reserve-A-Car!

## Current Objective

A simple React front-ed "uber-like" reservation system that takes a users pickup and dropoff address, compares it to an array of (currently static) vehicle coordinates, and returns the closest vehicle/driver pairing.

## Motivation

I'm fascinated with Uber's (and Lyft's, for that matter) reservation system. I wanted to try to build my own clone as an excercise using:

 * Custom React Hooks (see: the useGoogleGeocode hook I made!)
 * Googles Maps/Places/Locations/Directions API
 * Rolling my own auth/login system that follows best practices (will be changing that terrible terrible JWT in localstorage thing I have going on re: - <a href="https://www.rdegges.com/2018/please-stop-using-local-storage/">this great article on the subject.</a>

## Future plans

1. I intend on "FULLY" implementing redux into the project once I've fleshed out all the other boilerplate and logic flow.

2. Definitely going to clean up the UI. I'll probably put a few things into modals.
