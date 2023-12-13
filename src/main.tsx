import { Devvit } from '@devvit/public-api';


Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: 'Create Calculator Post',
  location: 'subreddit',
  onPress: async (_, { reddit, ui }) => {
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      preview: (
        <vstack padding="medium" cornerRadius="medium">
          <text style="heading" size="medium">
            Loading Calculator...
          </text>
        </vstack>
      ),
      title: `Devvit Calculator`,
      subredditName: subreddit.name,
    });

    ui.showToast({
      text: `Successfully created a Calculator post!`,
      appearance: 'success',
    });
  },
});



Devvit.addCustomPostType({
  name: 'Calculator',
  render: context => {
    const [expression, setExpression] = context.useState(''); 

    const handleButtonClick = value => {
      setExpression(prevExpression => prevExpression + value);
    };

    const handleCalculate = () => {
      try {
        setExpression(eval(expression).toString());
      } catch (error) {
        setExpression('Error');
      }
    };

    const handleClear = () => {
      setExpression('');
    };

    return (
      <vstack alignment='center middle' height='100%' gap='small'>
        <text size='xxlarge' weight='bold'>
          Calculator 🧮
        </text>
        <text size='large'>{expression}</text>
        <hstack alignment='center' gap='small'>
          {[1, 2, 3, '+'].map(value => (
            <button key={value} onPress={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
        </hstack>
        <hstack alignment='center' gap='small'>
          {[4, 5, 6, '-'].map(value => (
            <button key={value} onPress={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
        </hstack>
        <hstack alignment='center' gap='small'>
          {[7, 8, 9, '*'].map(value => (
            <button key={value} onPress={() => handleButtonClick(value)}>
              {value}
            </button>
          ))}
        </hstack>
        <hstack alignment='center' gap='small'>
          {[0, '/', '=', 'C'].map(value => (
            <button
              key={value}
              onPress={() => {
                if (value === '=') {
                  handleCalculate();
                } else if (value === 'C') {
                  handleClear();
                } else {
                  handleButtonClick(value);
                }
              }}
            >
              {value}
            </button>
          ))}
        </hstack>
      </vstack>
    );
  },
});

export default Devvit;


// Define what packages you want to use here
// Others include:
// kvStore: a simple key value store for persisting data across sessions within this installation
// media: used for importing and posting images
Devvit.configure({
  redditAPI: true, // context.reddit will now be available
});

/*
 * Use a menu action to create a custom post
 */
Devvit.addMenuItem({
  label: 'New custom post',
  location: 'subreddit',
  /*
   * _ tells Typescript we don't care about the first argument
   * The second argument is a Context object--here we use object destructuring to
   * pull just the parts we need. The code below is equivalient
   * to using context.reddit and context.ui
   */
  onPress: async (_, { reddit, ui }) => {
    const subreddit = await reddit.getCurrentSubreddit();

    /*
     * Submits the custom post to the specified subreddit
     */
    await reddit.submitPost({
      // This will show while your custom post is loading
      preview: (
        <vstack padding="medium" cornerRadius="medium">
          <text style="heading" size="medium">
            Loading custom post hello world...
          </text>
        </vstack>
      ),
      title: `${subreddit.name} Hello Custom Post`,
      subredditName: subreddit.name,
    });

    ui.showToast({
      text: `Successfully created a Hello World custom post!`,
      appearance: 'success',
    });
  },
});
