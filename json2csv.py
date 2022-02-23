#!/usr/bin/env python

import argparse
import csv
import json
import sys

from typing import IO, Iterable

parser = argparse.ArgumentParser('Convert UltimateGuitar tabs JSON to CSV')
parser.add_argument('-i', '--input', help='Input JSON file (default: read from stdin)')
parser.add_argument('-o', '--output', help='Output CSV file (default: write to stdout)')
args = parser.parse_args(sys.argv[1:])

def read_tabs_json(f: IO) -> Iterable[dict]:
    return json.load(f)


def write_tabs_csv(f: IO, tabs: Iterable[dict]):
    writer = csv.writer(f, delimiter=',')
    writer.writerow(['Artist', 'Title', 'Link'])
    writer.writerows([[tab['artist'], tab['title'], tab['link']] for tab in tabs])


if args.input:
    with open(args.input) as f:
        tabs = read_tabs_json(f)
else:
    tabs = read_tabs_json(sys.stdin)


if args.output:
    with open(args.output, 'w') as f:
        write_tabs_csv(f, tabs)
else:
    write_tabs_csv(sys.stdout, tabs)


# vim:sw=4:ts=4:et:
