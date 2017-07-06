var encodeCache = {};
// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
    var cache = encodeCache[exclude];
    if (cache) {
        return cache;
    }
    cache = encodeCache[exclude] = [];
    for (var i = 0; i < 128; i++) {
        var ch = String.fromCharCode(i);
        if (/^[0-9a-z]$/i.test(ch)) {
            // always allow unencoded alphanumeric characters
            cache.push(ch);
        }
        else {
            cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
        }
    }
    for (var i = 0; i < exclude.length; i++) {
        cache[exclude.charCodeAt(i)] = exclude[i];
    }
    return cache;
}
var defaultChars = ";/?:@&=+$,-_.!~*'()#";
// const componentChars = "-_.!~*'()";
// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
export function encode(s, exclude, keepEscaped) {
    var result = '';
    if (typeof exclude !== 'string') {
        // encode(string, keepEscaped)
        keepEscaped = exclude;
        exclude = defaultChars;
    }
    if (typeof keepEscaped === 'undefined') {
        keepEscaped = true;
    }
    var cache = getEncodeCache(exclude);
    var l = s.length;
    for (var i = 0; i < l; i++) {
        var code = s.charCodeAt(i);
        if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
            if (/^[0-9a-f]{2}$/i.test(s.slice(i + 1, i + 3))) {
                result += s.slice(i, i + 3);
                i += 2;
                continue;
            }
        }
        if (code < 128) {
            result += cache[code];
            continue;
        }
        if (code >= 0xD800 && code <= 0xDFFF) {
            if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
                var nextCode = s.charCodeAt(i + 1);
                if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
                    result += encodeURIComponent(s[i] + s[i + 1]);
                    i++;
                    continue;
                }
            }
            result += '%EF%BF%BD';
            continue;
        }
        result += encodeURIComponent(s[i]);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsSUFBTSxXQUFXLEdBQW9DLEVBQUUsQ0FBQztBQUd4RCx3RUFBd0U7QUFDeEUsNkNBQTZDO0FBQzdDLEVBQUU7QUFDRix3QkFBd0IsT0FBZTtJQUNuQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFBQyxDQUFDO0lBRTVCLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRWxDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDM0IsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixpREFBaUQ7WUFDakQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxD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