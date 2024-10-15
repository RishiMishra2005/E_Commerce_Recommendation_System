price = [40, 50, 60, 70, 100, 122, 106, 50, 30, 50]


def truncate(text, length):
    if len(text) > length:
        return text[:length] + "..."
    else:
        return text    