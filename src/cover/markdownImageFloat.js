/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
module.exports = (md, options) => {
  // console.log(md, options);
  md.inline.ruler.before('emphasis', 'image', imageWithFloat(md, options));
};

// eslint-disable-next-line no-unused-vars
function imageWithFloat(md, options) {
  return function(state, silent) {
    var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      // width = '',
      // height = '',
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

    if (state.src.charCodeAt(state.pos) !== 0x21 /* ! */) {
      return false;
    }
    if (state.src.charCodeAt(state.pos + 1) !== 0x5b /* [ */) {
      return false;
    }

    labelStart = state.pos + 2;
    labelEnd = md.helpers.parseLinkLabel(state, state.pos + 1, false);

    if (labelEnd < 0) {
      return false;
    }

    pos = labelEnd + 1;
    if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
      pos++;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0a) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }

      start = pos;
      res = md.helpers.parseLinkDestination(state.src, pos, state.posMax);
      if (res.ok) {
        href = state.md.normalizeLink(res.str);
        if (state.md.validateLink(href)) {
          pos = res.pos;
        } else {
          href = '';
        }
      }

      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0a) {
          break;
        }
      }

      res = md.helpers.parseLinkTitle(state.src, pos, state.posMax);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (code !== 0x20 && code !== 0x0a) {
            break;
          }
        }
      } else {
        title = '';
      }

      if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
        state.pos = oldPos;
        return false;
      }
      pos++;
    } else {
      if (typeof state.env.references === 'undefined') {
        return false;
      }

      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0a) {
          break;
        }
      }

      if (pos < max && state.src.charCodeAt(pos) === 0x5b /* [ */) {
        start = pos + 1;
        pos = md.helpers.parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = labelEnd + 1;
        }
      } else {
        pos = labelEnd + 1;
      }

      if (!label) {
        label = state.src.slice(labelStart, labelEnd);
      }

      ref = state.env.references[md.utils.normalizeReference(label)];
      if (!ref) {
        state.pos = oldPos;
        return false;
      }
      href = ref.href;
      title = ref.title;
    }

    if (!silent) {
      state.pos = labelStart;
      state.posMax = labelEnd;

      var newState = new state.md.inline.State(
        state.src.slice(labelStart, labelEnd),
        state.md,
        state.env,
        (tokens = [])
      );
      newState.md.inline.tokenize(newState);

      // // console.log({ href });
      token = state.push('image', 'img', 0);
      token.attrs = attrs = [['src', href], ['alt', '']];
      token.children = tokens;
      if (title) {
        attrs.push(['title', title]);
      }
      const hash = href.split('#').pop();
      if (hash) {
      //   // console.log(hash);
        const hashArr = hash.split('&');
        const hashObj = {};
        
        hashArr.forEach(item => {
          const kv = item.split('=')
          const k = kv[0]
          const v = kv[1]
          // const [k, v] = item.split('='); // react webpack build 过不去
          hashObj[k] = v;
        });
        // console.log({ hashObj });
        if (hashObj.float) {
          attrs.push([
            'style',
            `float: ${hashObj.float}; max-width: 50%; width: auto; margin:10px 15px; margin-${hashObj.float}: 0px`
          ]);
        }
      }
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  };
}
