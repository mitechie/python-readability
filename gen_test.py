"""
This program facilitates the creation of a regression test case as used by the
test module.  It uses the current readability algorithm to capture a benchmark
and construct a new test case.
"""
from regression_test import (
        TEST_DATA_PATH,
        READABLE_SUFFIX,
        YAML_EXTENSION,
        adjust_url_map,
        read_yaml
        )
import argparse
import errno
import os
import os.path
import readability
import readability.urlfetch as urlfetch
import sys
import urllib2
import urlparse
import yaml

OVERWRITE_QUESTION = '%s exists; overwrite and continue (y/n)? '

def y_or_n(question):
    while True:
        response = raw_input(question).strip()
        if len(response) > 0:
            return response[0] in ['y', 'Y']

def write_file(path, data):
    mode = 0644
    try:
        fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, mode)
    except OSError as e:
        if e.errno == errno.EEXIST:
            if y_or_n(OVERWRITE_QUESTION % path):
                fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, mode)
            else:
                return False
        else:
            raise e
    f = os.fdopen(fd, 'w')
    f.write(data)
    return True

def write_readable(path, orig, options):
    rdbl_doc = readability.Document(orig, **options)
    summary = rdbl_doc.summary()
    return write_file(path, summary.html)

def read_spec(test_name):
    yaml_path = os.path.join(TEST_DATA_PATH, test_name + YAML_EXTENSION)
    return read_yaml(yaml_path)

def read_orig(test_name, url = None):
    """
    Reads the original HTML for a given test.  If a url is provided, the HTML
    is fetched from it.  Otherwise, we look for an existing local copy.  This
    returns a pair: (HTML string, True iff the HTML has been or is already
    stored in a local copy).
    """
    if url:
        # TODO: Fix this.
        orig = urllib2.urlopen(url).read()
        path = os.path.join(TEST_DATA_PATH, test_name)
        write_result = write_file(path, orig)
        return orig, write_result
    else:
        orig_path = os.path.join(
                TEST_DATA_PATH,
                test_name
                )
        orig = open(orig_path).read()
        return orig, True

def maybe_mkdir(path):
    try:
        os.mkdir(path)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise e

def create(args):
    spec_dict = {'url': args.url, 'test_description': args.test_description}

    # We retrieve the page and all of its prerequisites so that it can be
    # displayed fully locally.  site_path is the path to the directory that
    # holds the structure of the site(s) necessary for the prerequisites.
    site_path = os.path.join(TEST_DATA_PATH, args.test_name)
    maybe_mkdir(site_path)

    fetcher = readability.urlfetch.LocalCopyUrlFetch(site_path)
    orig = fetcher.urlread(args.url)

    # We put the readable version of the page next to the original so that all
    # of the relative links work when we open it in a browser.
    rel_path = fetcher.urldict[args.url]
    path = os.path.join(site_path, rel_path)
    rdbl_path = ''.join([path, READABLE_SUFFIX])

    options = {'url': args.url, 'urlfetch': fetcher}
    if not write_readable(rdbl_path, orig, options):
        return False

    spec_dict['url_map'] = fetcher.urldict
    spec = yaml.dump(spec_dict, default_flow_style = False)
    yaml_path = os.path.join(TEST_DATA_PATH, args.test_name + YAML_EXTENSION)
    if not write_file(yaml_path, spec):
        return False

    return True

def genbench(args):
    spec_dict = read_spec(args.test_name)
    if args.refetch:
        url = spec_dict['url']
    else:
        url = None
    url_map = adjust_url_map(args.test_name, spec_dict.get('url_map', dict()))
    fetcher = readability.urlfetch.MockUrlFetch(url_map)
    options = {'url': spec_dict['url'], 'urlfetch': fetcher}
    orig, success = read_orig(args.test_name, url)
    if not success:
        return False
    rdbl_doc = readability.Document(orig, **options)
    summary = rdbl_doc.summary()
    if not write_file(args.test_name, READABLE_SUFFIX, summary.html):
        return False
    return True

DESCRIPTION = 'Create a readability regression test case.'

def main():
    parser = argparse.ArgumentParser(description = DESCRIPTION)
    subparsers = parser.add_subparsers(help = 'available subcommands')

    parser_create = subparsers.add_parser(
            'create',
            help = 'create an entirely new test'
            )
    parser_create.add_argument(
            'url',
            metavar = 'url',
            help = 'the url for which to generate a test'
            )
    parser_create.add_argument(
            'test_name',
            metavar = 'test-name',
            help = 'the name of the test'
            )
    parser_create.add_argument(
            'test_description',
            metavar = 'test-description',
            help = 'the description of the test'
            )
    parser_create.set_defaults(func = create)

    parser_genbench = subparsers.add_parser(
            'genbench',
            help = 'regenerate the benchmark for an existing test'
            )
    parser_genbench.add_argument(
            'test_name',
            metavar = 'test-name',
            help = 'the name of the test'
            )
    parser_genbench.add_argument(
            '--refetch',
            dest = 'refetch',
            action = 'store_const',
            const = True,
            default = False,
            help = 'if set, original html is refetched from the url'
            )
    parser_genbench.set_defaults(func = genbench)

    args = parser.parse_args()
    result = args.func(args)
    if not result:
        print('test was not fully generated')

if __name__ == '__main__':
    main()
