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
