def truncate(text, length):
    if len(text) > length:
        return text[:length] + "..."
    else:
        return text